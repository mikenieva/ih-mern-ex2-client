import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

export default createSchema({
  
  name: 'mySchema',

  types: schemaTypes.concat([
    {
      title: "Person",
      name: "person",
      type: "document",

      fields: [
        // This document has only one field
        {
          // The display name for this field
          title: "Name",

          // The identifier for this field used in the api's
          name: "name",

          // The type of this field
          type: "string",
        },
        {
          title: 'Cover',
          name: 'cover',
          type: 'image'
        },
      ]
    }
  ])
})
