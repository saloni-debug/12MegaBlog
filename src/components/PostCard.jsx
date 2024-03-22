import React from 'react'
import service from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) { // it is a way to write id as $id in appwrite. featuredImage is id of image and title is id of title in appwrite and $id is id of post in appwrite
  // link ki khasiyat h ki jaha se ho wahi se required place pr chala jata h
  return (
    <div>
      <Link to={`/posts/${$id}`}></Link> 
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/> 
        </div>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
    </div>
  )
}

export default PostCard
