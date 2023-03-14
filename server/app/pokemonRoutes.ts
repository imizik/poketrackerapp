import express from 'express';
import isAdmin from './adminMiddleware';
import { prisma } from './index'

const router = express.Router();

router.post('/', isAdmin, async (req, res) => {
  const { name, dex_number, type_1, type_2, image_url } = req.body;
  try {
    const pokemon = await prisma.pokemon.create({
      data: {
        name,
        dex_number,
        type_1,
        type_2,
        image_url,
      },
    });

    res.status(201).send('Added Pokemon!');
  } catch (err) {
    res.status(400).send('Could not add Pokemon');
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, dex_number, type_1, type_2, image_url } = req.body;

  try {
    const pokemon = await prisma.pokemon.update({
      where: { dex_number: parseInt(id) },
      data: {
        name,
        dex_number,
        type_1,
        type_2,
        image_url,
      },
    });

    res.status(200).send('Pokemon Updated!');
  } catch (err) {
    res.status(400).send("Could not update Pokemon");
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await prisma.pokemon.delete({
      where: { dex_number: parseInt(id) },
    });

    res.status(200).send('Deleted Pokemon!');
  } catch (err) {
    res.status(400).send("Could not delete Pokemon");
  }
});

router.get("/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const pokemon = await prisma.pokemon.findUnique({ where: { dex_number: parseInt(id) } });
  
      res.json(pokemon)
    } catch (err) {
      res.status(400).send("Could not get Pokemon");
    }
  });

export default router;