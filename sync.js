import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const targetDir = 'C:\\Users\\rafael.zanela\\brarq_env';
const currentDir = process.cwd();

// Detecta se está em ambiente de CI/CD (Vercel, GitHub Actions) ou se targetDir não existe
const isCI = Boolean(process.env.CI || process.env.VERCEL || !fs.existsSync(targetDir));

if (isCI) {
  if (process.argv.includes('--build')) {
    console.log('Ambiente de produção / CI detectado. Compilando com astro build...');
    execSync('npx astro build', { stdio: 'inherit', shell: true });
  } else {
    execSync('npx astro dev', { stdio: 'inherit', shell: true });
  }
} else {
  // Sincroniza arquivos de código para o ambiente com node_modules em NTFS
  const itemsToSync = ['src', 'public', 'astro.config.mjs', 'tsconfig.json'];

  for (const item of itemsToSync) {
    const srcPath = path.join(currentDir, item);
    const destPath = path.join(targetDir, item);

    if (fs.existsSync(srcPath)) {
      fs.cpSync(srcPath, destPath, { recursive: true, force: true });
    }
  }

  // Se for passado o argumento "build", executa o build e traz o dist de volta
  if (process.argv.includes('--build')) {
    console.log('Iniciando compilação do Astro...');
    
    execSync('node ./node_modules/astro/astro.js build', {
      cwd: targetDir,
      stdio: 'inherit',
      shell: true
    });

    const srcDist = path.join(targetDir, 'dist');
    const destDist = path.join(currentDir, 'dist');

    if (fs.existsSync(srcDist)) {
      fs.cpSync(srcDist, destDist, { recursive: true, force: true });
      console.log('✓ Build concluído com sucesso. Artefatos gerados em ./dist');
    }
  }
}
