import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const ToyType = new GraphQLObjectType({
  name: 'Toy',
  fields: {
    brand: { type: GraphQLString },
    style: { type: GraphQLString },
  },
});

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: {
    name: { type: GraphQLString },
    nickName: { type: GraphQLString },
    toy: {
      type: ToyType,
      resolve: () => {
        return {
          brand: 'Nyla',
          style: 'Bone',
        };
      },
    },
  },
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pet: {
      type: PetType,
      resolve: () => {
        return {
          name: 'Fidoneous',
          nickName: 'Fido',
        };
      },
    },
  },
});

const ParentType = new GraphQLObjectType({
  name: 'Parent',
  fields: {
    id: { type: GraphQLID },
    child: {
      type: PersonType,
      resolve: () => {
        return peopleData[0];
      },
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
    parent: {
      type: ParentType,
      resolve: () => {
        return { id: 'parent' };
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: function (_, { name }) {
        const person = {
          id: peopleData[peopleData.length - 1].id + 1,
          name,
        };

        peopleData.push(person);
        return person;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
