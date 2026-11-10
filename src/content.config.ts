import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string({ required_error: 'O título do projeto é obrigatório.' }),
      slug: z.string().optional(),
      categoria: z.enum(['residencial', 'comercial', 'interiores'], {
        errorMap: () => ({ message: "A categoria deve ser 'residencial', 'comercial' ou 'interiores'." }),
      }),
      status: z.enum(['concluido', 'em-andamento'], {
        errorMap: () => ({ message: "O status deve ser 'concluido' ou 'em-andamento'." }),
      }),
      local: z.string({ required_error: 'O local do projeto é obrigatório (ex.: Joinville/SC).' }),
      ano: z.number({ required_error: 'O ano de conclusão/desenvolvimento é obrigatório.' }),
      area_m2: z.number().optional(),
      equipe: z.array(z.string()).optional(),
      fotografia: z.string().optional(),
      premios: z.array(z.string()).optional(),
      resumo: z
        .string({ required_error: 'O resumo para o card é obrigatório.' })
        .max(120, 'O resumo do card deve ter no máximo 120 caracteres.'),
      capa: image(),
      galeria: z.array(image()),
      destaque: z.boolean().default(false),
      ordem: z.number().default(0),
    }),
});

export const collections = { projetos };

