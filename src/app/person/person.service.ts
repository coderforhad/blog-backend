import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { Person, PersonDocument } from './entities/person.entity';
import { Model, Schema as MongooSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>,
  ) {}

  async createPerson(createPersonInput: CreatePersonInput) {
    const createPerson = new this.personModel(createPersonInput);

    return createPerson.save();
  }

  async getAllPerson(limit: number, skip: number) {
    const personCount = await this.personModel.countDocuments();
    const person = await this.personModel.find().skip(skip).limit(limit);

    return { person, personCount };
    // return await this.personModel.find().skip(0).limit(10);
  }

  async getPersonById(id: MongooSchema.Types.ObjectId) {
    return this.personModel.findById(id);
  }

  async updatePerson(
    id: MongooSchema.Types.ObjectId,
    updatePersonInput: UpdatePersonInput,
  ) {
    return await this.personModel.findByIdAndUpdate(id, updatePersonInput, {
      new: true,
    });
  }

  async removePerson(id: MongooSchema.Types.ObjectId) {
    const deletedPerson = await this.personModel.findByIdAndDelete(id);

    if (!deletedPerson) {
      throw new Error(`Person with ID ${id} not found.`);
    }

    return deletedPerson;
  }
}
