import { Tag } from "antd";
import { Storage } from "aws-amplify";
import awsconfig from '../aws-exports';

const storageConfug = {
  level: 'public', 
  bucket: 'unifyfood-storage-7698524c91457-staging',
  region: awsconfig.aws_project_region
}

export const renderOrderStatus = (status) => {
  if (status === 'ACCEPTED') {
    return <Tag color={'green'}>{status}</Tag>
  }
  if (status === 'PENDING') {
    return <Tag color={'orange'}>{status}</Tag>
  }
  if (status === 'PREPARING') {
    return <Tag color={'orange'}>{status}</Tag>
  }
  if (status === 'DECLINED_BY_RESTAURANT') {
    return <Tag color={'red'}>{status}</Tag>
  }
  if (status === 'COMPLETED') {
    return <Tag color={'blue'}>{status}</Tag>
  }
  if (status === 'DELIVERING') {
    return <Tag color={'green'}>{status}</Tag>
  }
  if (status === 'READY_FOR_DELIVERY' || status === 'READY_FOR_PICKUP') {
    return <Tag color={'purple'}>{status}</Tag>
  }
};

export const handleUploadClick = async (dir, rawImage) => {
  try {
    const result = await Storage.put(`${dir}/${rawImage.name}`, rawImage, {
      ...storageConfug,
      contentType: rawImage.type,
    });
    // console.log(result)
    console.log('File uploaded successfully!');
    return await Storage.get(result.key, storageConfug);
  } catch (error) {
    console.log('Error uploading file: ', error);
    throw error
  }
};