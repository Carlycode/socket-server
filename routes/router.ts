import { Router, Request, Response, response } from 'express';


const router = Router();


router.get('/mensajes', (req: Request, res: Response) => {


  res.json({
    ok: true,
    mensaje: 'GET OK'
  })


});


router.post('/mensajes', (req: Request, res: Response) => {

  const body = req.body.body;
  const from = req.body.from;


  res.json({
    ok: true,
    mensaje: 'POST OK',
    body,
    from,
  })


});

router.post('/mensajes/:id', (req: Request, res: Response) => {

  const body = req.body.body;
  const from = req.body.from;
  const id = req.params.id;

  res.json({
    ok: true,
    mensaje: 'POST OK',
    body,
    from,
    id
  })


});

export default router;