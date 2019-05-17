const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = graphql;

const games = [
  { name: 'Skyrim', genres: ['Fantasy', 'Action'], id: '1', publisherId: '1' },
  { name: 'Oblivion', genres: ['Fantasy', 'Action'], id: '2', publisherId: '1' },
  { name: 'Overlord', genres: ['Fantasy', 'RPG'], id: '3', publisherId: '2' },
  { name: 'Dirt 3', genres: ['Racing'], id: '4', publisherId: '2' },
  { name: 'Dirt 4', genres: ['Racing'], id: '5', publisherId: '2' },
  { name: 'Dirt Rally', genres: ['Racing'], id: '6', publisherId: '2' },
];

const publishers = [
  { name: 'Bethesda Softworks', id: '1' },
  { name: 'Codemasters', id: '2' }
];

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genres: { type: new GraphQLList(GraphQLString) },
    publisher: {
      type: PublisherType,
      resolve(parent, args) {
        return _.find(publishers, { id: parent.publisherId });
      }
    }
  })
});

const PublisherType = new GraphQLObjectType({
  name: 'Publisher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return _.filter(games, { publisherId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(games, { id });
      }
    },
    publisher: {
      type: PublisherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(publishers, { id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
