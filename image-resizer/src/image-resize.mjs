import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import pLimit from 'p-limit';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Uso: node src/imageResizer.mjs <diretorio-de-entrada> <diretorio-de-saida> [largura] [altura]');
  process.exit(1);
}

const inputDir = args[0];
const outputDir = args[1];
const width = args[2] ? parseInt(args[2]) : 400;
const height = args[3] ? parseInt(args[3]) : 400;

const limit = pLimit(10);

const resizeImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(width, height, { fit: 'cover' })
      .toFile(outputPath);
    console.log(`Imagem redimensionada: ${outputPath}`);
  } catch (error) {
    console.error(`Erro ao redimensionar ${inputPath}:`, error);
  }
};

const processDirectory = async (currentDir) => {
  const files = await fs.readdir(currentDir);
  const tasks = [];

  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      tasks.push(processDirectory(filePath));
    } else if (stat.isFile() && /\.(jpg|jpeg|png|webp|bmp)$/i.test(file)) {
      const relativePath = path.relative(inputDir, filePath);
      const outputPath = path.join(outputDir, relativePath);
      const outputDirPath = path.dirname(outputPath);

      await fs.ensureDir(outputDirPath);

      tasks.push(limit(() => resizeImage(filePath, outputPath)));
    }
  }
  await Promise.all(tasks);
};

const start = async () => {
  try {
    await fs.ensureDir(outputDir);
    await processDirectory(inputDir);
    console.log('Processo de redimensionamento concluído!');
  } catch (error) {
    console.error('Erro ao processar as imagens:', error);
  }
};

start();
