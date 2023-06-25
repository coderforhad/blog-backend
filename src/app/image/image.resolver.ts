import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => String)
  uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    return this.imageService.uploadImage(file);
  }
}
