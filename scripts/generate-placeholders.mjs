import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('C:/Users/rafael.zanela/brarq_env/node_modules/sharp');

const projects = [
  {
    slug: 'casa-rb',
    name: 'CASA RB',
    location: 'JOINVILLE/SC',
    images: [
      { name: '01.jpg', width: 2520, height: 1080, ratio: '21:9', desc: 'FACHADA PRINCIPAL E VOLUME SUPERIOR' },
      { name: '02.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'ÁREA SOCIAL INTEGRADA E PÉ-DIREITO DUPLO' },
      { name: '03.jpg', width: 1200, height: 1500, ratio: '4:5', desc: 'DETALHE PAINEL FREIJÓ E ESCADA EM CONCRETO' },
      { name: '04.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'VARANDA COBERTA E INTEGRAÇÃO COM O JARDIM SUL' },
      { name: '05.jpg', width: 1200, height: 1500, ratio: '4:5', desc: 'SUÍTE PRINCIPAL COM ABERTURA ZENITAL' },
    ]
  },
  {
    slug: 'madville',
    name: 'MADVILLE',
    location: 'JOINVILLE/SC',
    images: [
      { name: '01.jpg', width: 2520, height: 1080, ratio: '21:9', desc: 'FACHADA COMERCIAL CONTEMPORÂNEA' },
      { name: '02.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'ÁTRIO DE CIRCULAÇÃO E ILUMINAÇÃO NATURAL' },
      { name: '03.jpg', width: 1200, height: 1500, ratio: '4:5', desc: 'DETALHE ESTRUTURAL E RITMO DOS BRIZES' },
      { name: '04.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'ESPAÇO CORPORATIVO COM LUZ DIFUSA' },
      { name: '05.jpg', width: 1200, height: 1500, ratio: '4:5', desc: 'RECEPCÃO COM TEXTURA MINERAL E SERRALHERIA FINA' },
    ]
  },
  {
    slug: 'residencia-itapoa',
    name: 'RESIDÊNCIA ITAPOÁ',
    location: 'ITAPOÁ/SC',
    images: [
      { name: '01.jpg', width: 2520, height: 1080, ratio: '21:9', desc: 'IMPLANTAÇÃO HORIZONTAL E VISTA PARA O MAR' },
      { name: '02.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'VARANDA CONTÍNUA EM CONCRETO APARENTE' },
    ]
  },
  {
    slug: 'edificio-flora',
    name: 'EDIFÍCIO FLORA',
    location: 'JOINVILLE/SC',
    images: [
      { name: '01.jpg', width: 2520, height: 1080, ratio: '21:9', desc: 'VOLUMETRIA ESCALONADA E JARDINS VERTICAIS' },
      { name: '02.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'TÉRREO INTEGRADO À PRAÇA PÚBLICA' },
    ]
  },
  {
    slug: 'apartamento-atlantico',
    name: 'APARTAMENTO ATLÂNTICO',
    location: 'BALNEÁRIO CAMBORIÚ/SC',
    images: [
      { name: '01.jpg', width: 2520, height: 1080, ratio: '21:9', desc: 'LIVING INTEGRADO COM CURADORIA MINERAL' },
      { name: '02.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'MARCENARIA EM NOGUEIRA E LUZ DIFUSA' },
    ]
  },
  {
    slug: 'casa-da-mata',
    name: 'CASA DA MATA',
    location: 'JOINVILLE/SC',
    images: [
      { name: '01.jpg', width: 2520, height: 1080, ratio: '21:9', desc: 'PAVILHÃO ELEVADO NA ENCOSTA PRESERVADA' },
      { name: '02.jpg', width: 1800, height: 1200, ratio: '3:2', desc: 'ESTRUTURA METÁLICA E GRANDES PLANOS DE VIDRO' },
    ]
  }
];

async function generate() {
  for (const proj of projects) {
    const dir = path.join(process.cwd(), 'src', 'assets', 'projetos', proj.slug);
    fs.mkdirSync(dir, { recursive: true });

    for (const img of proj.images) {
      const filePath = path.join(dir, img.name);
      
      const svg = `
      <svg width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#E9E4DB" />
        <rect x="24" y="24" width="${img.width - 48}" height="${img.height - 48}" fill="none" stroke="#CFC8BC" stroke-width="1.5" />
        <line x1="24" y1="24" x2="${img.width - 24}" y2="${img.height - 24}" stroke="#CFC8BC" stroke-width="0.75" stroke-dasharray="6,6" opacity="0.4" />
        <line x1="${img.width - 24}" y1="24" x2="24" y2="${img.height - 24}" stroke="#CFC8BC" stroke-width="0.75" stroke-dasharray="6,6" opacity="0.4" />

        <g transform="translate(${img.width / 2}, ${img.height / 2})">
          <text y="-30" font-family="monospace" font-size="20" fill="#8C4A2F" text-anchor="middle" letter-spacing="4">
            [FOTO PENDENTE — AUTORIZAÇÃO / ARQUIVO ORIGINAL]
          </text>
          <text y="15" font-family="serif" font-size="36" fill="#1B1A17" text-anchor="middle" letter-spacing="1">
            ${proj.name} — ${img.desc}
          </text>
          <text y="55" font-family="monospace" font-size="16" fill="#5E5A52" text-anchor="middle" letter-spacing="3">
            ${proj.location} · PROPORÇÃO ${img.ratio} (${img.width}×${img.height})
          </text>
        </g>

        <text x="48" y="${img.height - 48}" font-family="monospace" font-size="14" fill="#5E5A52" letter-spacing="2">
          BORGES E ROBLES ARQUITETURA · ARQUIVO OFICIAL PENDENTE
        </text>
      </svg>`;

      await sharp(Buffer.from(svg))
        .jpeg({ quality: 90 })
        .toFile(filePath);

      console.log(`✓ Gerado: src/assets/projetos/${proj.slug}/${img.name}`);
    }
  }

  // Geração dos placeholders institucionais do Escritório (seção 6.4)
  const officeDir = path.join(process.cwd(), 'src', 'assets', 'escritorio');
  fs.mkdirSync(officeDir, { recursive: true });

  const officeImages = [
    {
      name: 'escritorio.jpg',
      width: 2400,
      height: 1350,
      title: 'ATELIÊ BORGES E ROBLES ARQUITETURA',
      desc: 'RUA LAGES, 743 — JOINVILLE/SC',
      badge: '[SUBSTITUIR: FOTOGRAFIA DO ESCRITÓRIO / EQUIPE]'
    },
    {
      name: 'socio-borges.jpg',
      width: 1200,
      height: 1500,
      title: 'SÓCIO BORGES',
      desc: 'ARQUITETO E URBANISTA · CO-FUNDADOR',
      badge: '[SUBSTITUIR: RETRATO OFICIAL DO SÓCIO]'
    },
    {
      name: 'socio-robles.jpg',
      width: 1200,
      height: 1500,
      title: 'SÓCIO ROBLES',
      desc: 'ARQUITETO E URBANISTA · CO-FUNDADOR',
      badge: '[SUBSTITUIR: RETRATO OFICIAL DO SÓCIO]'
    }
  ];

  for (const item of officeImages) {
    const filePath = path.join(officeDir, item.name);
    const svg = `
    <svg width="${item.width}" height="${item.height}" viewBox="0 0 ${item.width} ${item.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#E9E4DB" />
      <rect x="24" y="24" width="${item.width - 48}" height="${item.height - 48}" fill="none" stroke="#CFC8BC" stroke-width="1.5" />
      <line x1="24" y1="24" x2="${item.width - 24}" y2="${item.height - 24}" stroke="#CFC8BC" stroke-width="0.75" stroke-dasharray="6,6" opacity="0.4" />
      <line x1="${item.width - 24}" y1="24" x2="24" y2="${item.height - 24}" stroke="#CFC8BC" stroke-width="0.75" stroke-dasharray="6,6" opacity="0.4" />

      <g transform="translate(${item.width / 2}, ${item.height / 2})">
        <text y="-25" font-family="monospace" font-size="20" fill="#8C4A2F" text-anchor="middle" letter-spacing="4">
          ${item.badge}
        </text>
        <text y="20" font-family="serif" font-size="34" fill="#1B1A17" text-anchor="middle" letter-spacing="1">
          ${item.title}
        </text>
        <text y="60" font-family="monospace" font-size="16" fill="#5E5A52" text-anchor="middle" letter-spacing="3">
          ${item.desc}
        </text>
      </g>
    </svg>`;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(filePath);

    console.log(`✓ Gerado: src/assets/escritorio/${item.name}`);
  }
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
