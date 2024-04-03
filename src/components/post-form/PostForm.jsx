import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) { // ye information user dega
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "", // agar post h to title dedo nhi to default title dedo ya empty dedo
            slug: post?.slug || "",
            content: post?.content || "",
            featuredImage: post?.featuredImage || "",
            status: post?.status || "active",
            author: post?.author || ""
        }
    }) // from react-hook-form

    const navigate = useNavigate()
    const userData = UseSelector(state => state.userData)

    const submit = async(data) => {
        if(post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                service.deleteFile(post.featuredImage)
            }
            const dbPost =await service.updatePost(post.$id, {...data, featuredImage: file? file.$id : undefined})
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null
            const dbPost = await service.createPost({...data, userId: userData?.$id, featuredImage: file? file.$id : undefined}) 
            
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } 
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
        }
        return ""
    }, [])

    React.useEffect(() => {
        if (post) {
            setValue("title", post.title)
            setValue("slug", post.slug)
            setValue("content", post.content)
            setValue("featuredImage", post.featuredImage)
            setValue("status", post.status)
        }
    }, [post, setValue])
    
  return (
    <div>
      
    </div>
  )
}

export default PostForm
