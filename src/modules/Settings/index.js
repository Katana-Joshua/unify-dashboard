import React, {
  useContext,
  useEffect,
  useState
} from "react";
import { Form, Input, Card, Button, Image, Radio, Divider } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { AuthContext } from "../../Context/AuthContext";
import { handleUploadClick } from "../../util/functions";

const API_KEY = 'AIzaSyAPmarOWwuOyicLAo5NHtyv5mnWBQ8oUUA';
const Settings = () => {
  const [restaurantName, setRestaurantName] = useState(null);
  const [address, setAddress] = useState(null);
  const [textAddress, setTextAddress] = useState('');
  const [uploading, setUploading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [image, setImage] = useState(null);
  const [planB, setPlanB] = useState(false);
  const [categories, setCategories] = useState({
    in_campus: false,
    fast_food: false,
    local_food: false
  });
  const { auth, restaurant, createRestaurant, loading, updateRestaurant } = useContext(AuthContext);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ rawImage, setRawImage ] = useState(null);

  useEffect(() => {
    if(restaurant){
      setIsUpdate(true);
      setRestaurantName(restaurant.name);
      setCategories(restaurant.categories);
      setAddress(restaurant.address);
      setCoordinates({ lat: restaurant.lat, lng: restaurant.lng });
      setImage(restaurant.cover_image);
    }
  }, []);

  const getAddressLatLng = async (address) => {
    try {
      console.log(address);
      setAddress(address);
      const geocodedByAddress = await geocodeByAddress(address.label);
      const latLng = await getLatLng(geocodedByAddress[0]);
      if(!geocodedByAddress || !latLng && !address){
        setPlanB(true);
        return;
      }
      setCoordinates(latLng);
    } catch (error) {
      console.log(error);
      setPlanB(true);
    }
  };

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.value);
    setRawImage(file);
  }

  const selectCat = cat => {
    setCategories(cats => ({
      ...cats,
      [cat]: !cats[cat]
    }));
  }

  const onSubmit = async() => {
    //0.3574515,32.7375806
    setUploading(true);
    const cover_image = await handleUploadClick('restaurants', rawImage);
    console.log(cover_image)
    setUploading(false);
    const rest_data = {
      categories,
      cover_image: cover_image.split('?')[0],
      // cover_image: image,
      lat: planB ? 0.3574515 : coordinates.lat,
      lng: planB ? 32.7375806 : coordinates.lng,
      name: restaurantName,
      address: planB ? textAddress : address.label,
      adminSub: auth.sub,
      drinks: [],
      rating: 0.0
    }
    if(isUpdate){
      console.log('is update')
      updateRestaurant(rest_data);
      return;
    }
    createRestaurant(rest_data);
  }

  return (
    <Card title={isUpdate ? "Update Restaurant info" : "Restaurant Details"} style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }}>
        {image && <Image src={image} height={200} width={300} style={{ borderRadius: 10 }}/>}
        <Form.Item label="Restaurant Poster" required>
          <Input type="file" onChange={e => onSelectImage(e)}/>
          {/* <Input value={imageUrl} placeholder="image url" onChange={e => setImageUrl(e.target.value)}/> */}
        </Form.Item>
        <Divider />
        <Form.Item label="Restaurant Name" required>
          <Input value={restaurantName} placeholder="Enter restaurant name here" onChange={e => setRestaurantName(e.target.value)}/>
        </Form.Item>
        {planB ? 
        <Form.Item label="Address" required>
          <Input value={textAddress} placeholder="Enter restaurant address here" onChange={e => setTextAddress(e.target.value)}/>
        </Form.Item>
        :
        <Form.Item label="Lookup Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey={API_KEY}
            // apiKey={process.env.GOOGLE_PLACES_API}
            selectProps={{
              value: address,
              onChange: getAddressLatLng,
            }}
          />
        </Form.Item>}
        <Form.Item label="Pick restaurant Categories (Select at least one)" required>
          <Radio 
            checked={categories.in_campus}
            onClick={() => selectCat("in_campus")}
            >In campus restaurant</Radio>
          <Radio 
            onClick={() => selectCat("fast_food")}
            checked={categories.fast_food} 
            >Fast food</Radio>
          <Radio 
            onClick={() => selectCat("local_food")}
            checked={categories.local_food} 
            >Local food</Radio>
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={loading || uploading} onClick={onSubmit}>{uploading ? "Uploading image..." : (loading ? 'Creating details...' : 'Submit')}</Button>
        </Form.Item>
      </Form>
      <span>{coordinates?.lat} - {coordinates?.lng}</span>
    </Card>
  );
};

export default Settings;
