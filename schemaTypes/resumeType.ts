import {defineType, defineField} from 'sanity'

export const resumeType = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resume Title',
      type: 'string',
      description: 'Name or title for this resume version',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'entries',
      title: 'Resume Entries',
      type: 'array',
      description: 'Experience, education, and other resume entries',
      of: [
        {
          type: 'object',
          name: 'resumeEntry',
          title: 'Resume Entry',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Job title, degree, or entry title',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'organization',
              title: 'Organization',
              type: 'string',
              description: 'Company, school, or organization name',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'City, state/country'
            }),
            defineField({
              name: 'type',
              title: 'Entry Type',
              type: 'string',
              description: 'Category of resume entry',
              options: {
                list: [
                  {title: 'Experience', value: 'Experience'},
                  {title: 'Education', value: 'Education'},
                  {title: 'Skills', value: 'Skills'},
                  {title: 'Projects', value: 'Projects'},
                  {title: 'Certifications', value: 'Certifications'},
                  {title: 'Awards', value: 'Awards'}
                ],
                layout: 'radio'
              },
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'subtype',
              title: 'Subtype',
              type: 'string',
              description: 'Additional categorization (Full-Time, Graduate, etc.)',
              options: {
                list: [
                  {title: 'Full-Time', value: 'Full-Time'},
                  {title: 'Part-Time', value: 'Part-Time'},
                  {title: 'Contract', value: 'Contract'},
                  {title: 'Internship', value: 'Internship'},
                  {title: 'Graduate', value: 'Graduate'},
                  {title: 'Undergraduate', value: 'Undergraduate'},
                  {title: 'Certificate', value: 'Certificate'}
                ]
              }
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Brief description or summary',
              rows: 3
            }),
            defineField({
              name: 'items',
              title: 'Achievement Items',
              type: 'array',
              description: 'List of achievements, responsibilities, or bullet points',
              of: [{type: 'string'}]
            }),
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              description: 'When this position/education began',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'When this position/education ended (leave blank if current)'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'organization',
              type: 'type'
            },
            prepare({title, subtitle, type}) {
              return {
                title: title,
                subtitle: `${subtitle} • ${type}`
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      entries: 'entries'
    },
    prepare({title, entries}) {
      const entryCount = entries?.length || 0
      return {
        title: title,
        subtitle: `${entryCount} entries`
      }
    }
  }
})