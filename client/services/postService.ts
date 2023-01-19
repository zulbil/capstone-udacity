import Axios from "axios";
import { Post } from "../types/Post";

const apiEndpoint = process.env.NEXT_PUBLIC_APP_DOMAIN || ''

export async function getPosts(idToken:string) : Promise<Post[]> {
  try {

      const response = await Axios.get(`${apiEndpoint}/posts`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
          }
      })
  
      return response.data.items
  } catch (error: any) {
      console.log('Error when fetching posts ...', error.message)
      return []
  }
}

export async function createPost(
    idToken: string,
    newPost: Post
  ): Promise<Post|null> {
    try {
      const response = await Axios.post(`${apiEndpoint}/posts`,  JSON.stringify(newPost), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      })
      return response.data.item
    } catch (error: any) {
        console.log('Error when creating a new post ...', error.message)
        return null
    }
}

export async function updatePost(
  idToken: string,
  postId: string,
  updatedPost: Post
): Promise<Post|null> {
  try {
    const response = await Axios.patch(`${apiEndpoint}/posts/${postId}`,  JSON.stringify(updatedPost), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })
    return response.data.item
  } catch (error: any) {
      console.log('Error when creating a new post ...', error.message)
      return null
  }
}

export async function deletePost(
    idToken: string,
    postId: string
  ): Promise<void> {
    await Axios.delete(`${apiEndpoint}/posts/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })
}