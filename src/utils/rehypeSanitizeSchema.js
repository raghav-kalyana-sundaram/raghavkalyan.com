import { defaultSchema } from 'rehype-sanitize';

const hljsClass = /^hljs(-|$)/;

export const markdownSanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'iframe',
    'span',
    'div',
    'sup',
    'sub',
    'del',
    'input',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  attributes: {
    ...defaultSchema.attributes,
    h1: [...(defaultSchema.attributes?.h1 || []), 'id'],
    h2: [...(defaultSchema.attributes?.h2 || []), 'id'],
    h3: [...(defaultSchema.attributes?.h3 || []), 'id'],
    h4: [...(defaultSchema.attributes?.h4 || []), 'id'],
    h5: [...(defaultSchema.attributes?.h5 || []), 'id'],
    h6: [...(defaultSchema.attributes?.h6 || []), 'id'],
    code: [...(defaultSchema.attributes?.code || []), 'className', 'class'],
    pre: [...(defaultSchema.attributes?.pre || []), 'className', 'class'],
    span: [
      ...(defaultSchema.attributes?.span || []),
      ['className', hljsClass],
      ['class', hljsClass],
    ],
    iframe: [
      'src',
      'title',
      'width',
      'height',
      'allow',
      'allowfullscreen',
      'loading',
      'referrerpolicy',
      'className',
      'class',
    ],
    div: [...(defaultSchema.attributes?.div || []), 'className', 'class'],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ['http', 'https'],
    href: ['http', 'https', 'mailto', 'tel'],
  },
};
