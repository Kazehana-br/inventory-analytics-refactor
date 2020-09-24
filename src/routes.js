const { Router } = require("express");
const { verifyJWT } = require("./middleware/verifyJWT");

//Importacao App controllers
const WarehouseController = require("./controllers/WarehouseController");
const LocalController = require("./controllers/LocalController");
const FilialController = require("./controllers/FilialController");
const ProductController = require("./controllers/ProductController");
const SupplierController = require("./controllers/SupplierController");
const DocumentController = require("./controllers/DocumentController");
const ProductInputController = require("./controllers/ProductInputController");
const ProductOutputController = require("./controllers/ProductOutputController");

const routes = Router();

routes.get("/warehouse-all", WarehouseController.index);
routes.post("/warehouse-create", WarehouseController.store);
routes.get("/warehouse-details/:id", WarehouseController.show);
routes.post("/warehouse-add-product/:id", WarehouseController.AddProduct);
routes.post(
  "/warehouse-add-product-input/:id",
  WarehouseController.AddProductInput
);
routes.post(
  "/warehouse-add-product-output/:id",
  WarehouseController.AddProductOutput
);


routes.get("/local-all", LocalController.index);
routes.post("/local-create", LocalController.store);
routes.get("/local-details/:id", LocalController.show);
routes.post("/local-add-warehouse/:id", LocalController.AddWarehouse);

routes.get("/filial-all", FilialController.index);
routes.post("/filial-create", FilialController.store);
routes.get("/filial-details/:id", FilialController.show);
routes.post("/filial-add-warehouse/:id", FilialController.AddWarehouse);

routes.get("/product-all", ProductController.index);
routes.post("/product-create", ProductController.store);
routes.get("/product-details/:id", ProductController.show);
routes.post("/product-add-supplier/:id", ProductController.AddSupplier);

routes.get("/supplier-all", SupplierController.index);
routes.post("/supplier-create", SupplierController.store);
routes.get("/supplier-details/:id", SupplierController.show);
routes.post("/supplier-add-product/:id", SupplierController.AddProduct);

routes.get("/document-all", DocumentController.index);
routes.post("/document-create", DocumentController.store);
routes.get("/document-details/:id", DocumentController.show);

routes.get("/product-input-all", ProductInputController.index);
routes.post("/product-input-create", ProductInputController.store);
routes.post("/product-input-create-third", ProductInputController.storeThird);
routes.get("/product-input-details/:id", ProductInputController.show);
routes.post(
  "/product-input-add-document/:id",
  ProductInputController.AddDocument
);


routes.get("/product-output-all", ProductOutputController.index);
routes.post("/product-output-create", ProductOutputController.store);
routes.get("/product-output-details/:id", ProductOutputController.show);

routes.post(
  "/product-output-add-document/:id",
  ProductOutputController.AddDocument
);
module.exports = routes;
