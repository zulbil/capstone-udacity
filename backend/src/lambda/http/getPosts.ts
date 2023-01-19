import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { formatJSONResponse } from '../../utils/api-gateway'
import { postRepository } from '../../repositories';

const logger = createLogger('getPosts')

export const handler = middy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const posts = await postRepository.getPosts();
      logger.info('Get Posts API from DynamoDB Table', { posts });      
      const response = { items : posts };
      return formatJSONResponse(response);
    } catch (error: any) {
      logger.error('Get Posts failed' , { error });  
      return formatJSONResponse({
        message: error.message
      }, 500)
    }
  }  
)

handler.use(
  cors({
    credentials: true
  })
)
