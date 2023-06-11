import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { GetPersonPaginatedResponse, Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { Schema as MongooSchema } from 'mongoose';
import { GetPaginatedArgs } from '../common/dto/get-paginated.args';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(() => Person)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personService.createPerson(createPersonInput);
  }

  @Query(() => GetPersonPaginatedResponse, { name: 'getAllPerson' })
  getAllPerson(@Args() args: GetPaginatedArgs) {
    return this.personService.getAllPerson(args.limit, args.skip);
  }

  @Query(() => Person, { name: 'personById' })
  getPersonById(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.personService.getPersonById(id);
  }

  @Mutation(() => Person)
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ) {
    return this.personService.updatePerson(
      updatePersonInput._id,
      updatePersonInput,
    );
  }

  @Mutation(() => Person)
  removePerson(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.personService.remove(id);
  }
}
