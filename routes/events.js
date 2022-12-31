/*
  ? Rutas de eventos / events
  ? host + /api/events
*/

/**
 * ! todas las rutas deben estar validadas por el JWT
 *
 */

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(validarJWT); // todas validan el JWT

// obtener eventos
router.get("/", getEventos);

// crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom( isDate ),
    check("end", "Fecha de finalización es obligatoria").custom( isDate ),
    validarCampos
  ],
  crearEvento
);

// actualizar evento
router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom( isDate ),
    check("end", "Fecha de finalización es obligatoria").custom( isDate ),
    validarCampos
  ],
  actualizarEvento
);



// borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
