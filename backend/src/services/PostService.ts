import { postRepository } from "../repositories";
import { PostItem } from "../models/PostItem";
import { CreatePostRequest } from "../requests/CreatePostRequest";
import * as uuid from 'uuid';
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { TodoUpdate } from '../models/PostUpdate';
import { createLogger } from "../utils/logger";

export default class PostService {

    private logger: any = createLogger('postService')
    //private bucketName: string = process.env.ATTACHMENT_S3_BUCKET;

    constructor() {}

    async getPosts(userId:string): Promise<PostItem[]> {
        this.logger.info('Get posts for connected user');
        return await postRepository.getPosts(userId);
    }

    async getPost(userId:string, postId:string): Promise<PostItem> {
        this.logger.info('Get one post for connected user');
        return await postRepository.getPost(userId, postId);
    }
    
    async createPost(
        createPostRequest: CreatePostRequest,
        jwtToken: string) : Promise<PostItem> {
        
        try {

            const itemId            = uuid.v4();
            const userId            = jwtToken;

            this.logger.info('Creating new post');

            const postTocreate = {
                postId: itemId,
                userId: userId,
                message: createPostRequest.message,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                attachmentUrl: ''
            };

            if (!postTocreate.message) {
                this.logger.info('Message property is invalid');
                throw new Error('Please provide a valid message');
            }
        
            return postRepository.createPost(postTocreate);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new Error(error.message);
        }
        
    }
    
    /*
    async updateTodo(
        id: string,
        userId: string,
        updateTodoRequest: UpdateTodoRequest
        ) : Promise<TodoUpdate> {
        
        try {
            this.logger.info('Updating todo');

            const todoItemToUpdate : Partial<TodoUpdate> = {
                name: updateTodoRequest.name,
                dueDate: updateTodoRequest.dueDate,
                done: updateTodoRequest.done
            };

            if (!todoItemToUpdate.name) {
                this.logger.info('Name property is invalid');
                throw new Error('Name property is invalid!');
            }
            return await todoRepository.updateTodo(id, userId, todoItemToUpdate);
        } catch (error:any) {
            this.logger.error(error.message);
            throw new Error(error.message);
        }
    }

    async updateTodoAttachmentUrl(
        id: string,
        userId: string
        ) : Promise<TodoUpdate> {
        
        try {
            this.logger.info('Updating todo');
            const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${id}`;
            return await todoRepository.updateTodoAttachment(id, userId, attachmentUrl);
        } catch (error:any) {
            this.logger.error(error.message);
            throw new Error(error.message);
        }
    }
    */
    
    async deletePost(id: string, userId: string) {
        this.logger.info('Deleting post');
        await postRepository.deletePost(id, userId);
    }
}