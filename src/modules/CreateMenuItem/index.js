import { Form, Input, Button, Card, InputNumber, Image, Divider } from "antd";
import { DataStore } from "aws-amplify";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Dish } from "../../models";
import { handleUploadClick } from "../../util/functions";

const { TextArea } = Input;

const CreateMenuItem = () => {
  const {  restaurant } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [ dishFormData, setDishFormData ] = useState({
    dish_name: '',
    description: '',
    price: 0,
    extras: [
      { name: 'Fries', price: 2000 },
      { name: 'Salad', price: 2000 },
      { name: 'Fruits', price: 3000 }
    ]
  });
  const [ creating, setCreating ] = useState(false);
  const [ rawImage, setRawImage ] = useState(null);
  const navigate = useNavigate();

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.value);
    setRawImage(file);
  }

  const onChangeTextHandler = (field, e) => {
    setDishFormData({
      ...dishFormData,
      [field]: e.target.value
    })
  }
  const onChangeNumberHandler = (field, val) => {
    setDishFormData({
      ...dishFormData,
      [field]: val
    })
  }

  const createDish = async () => {
    const dish_image = await handleUploadClick('dishes', rawImage);
    setCreating(true);
    DataStore.save(new Dish({
      ...dishFormData,
      image: dish_image.split('?')[0],
      restaurantID: restaurant.id,
    }))
    .then(res => {
      console.log(res);
      setCreating(false);
      navigate('/menu');
    })
    .catch(err => {
      console.log(err)
      setCreating(false);
    });
  }

  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }}>
        {image && <Image src={image} height={200} width={300} style={{ borderRadius: 10 }}/>}
        <Form.Item label="Dish picture" required>
          <Input type="file" onChange={e => onSelectImage(e)}/>
        </Form.Item>
        <Divider /> 
        <Form.Item label="Dish Name" required>
          <Input placeholder="Enter dish name" onChange={e => onChangeTextHandler('dish_name', e)}/>
        </Form.Item>
        <Form.Item label="Dish Description" required>
          <TextArea rows={4} placeholder="Enter dish description" onChange={e => onChangeTextHandler('description', e)}/>
        </Form.Item>
        <Form.Item label="Price (UGX)" required>
          <InputNumber onChange={val => onChangeNumberHandler('price', val)}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={creating} onClick={createDish}>{creating ? 'Adding...' : 'Submit'}</Button>
        </Form.Item>
      </Form>
    </Card>
  )
};

export default CreateMenuItem;