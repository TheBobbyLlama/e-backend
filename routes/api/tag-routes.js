const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      { model: Product },
    ]
  })
	.then(dbTagData => res.json(dbTagData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
		  id: req.params.id
		},
    include: [
      { model: Product }
    ]
  })
	.then(dbTagData => {
		if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
		}
		res.json(dbTagData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.post('/', (req, res) => {
	Tag.create(req.body)
	.then(dbTagData => res.json(dbTagData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

router.put('/:id', (req, res) => {
	Tag.update(req.body, {
		individualHooks: true,
		where: {
			id: req.params.id
		}
	})
	.then(dbTagData => {
    if (!dbTagData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbTagData);
	})
	.catch(err => {
    console.log(err);
    res.status(500).json(err);
	});
});

router.delete('/:id', (req, res) => {
	Tag.destroy({
	  where: {
		id: req.params.id
	  }
	})
	.then(dbTagData => {
		if (!dbTagData) {
		  res.status(404).json({ message: 'No tag found with this id' });
		  return;
		}
		res.json(dbTagData);
	  })
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;
