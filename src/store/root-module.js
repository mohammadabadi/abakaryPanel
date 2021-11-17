import categoryModule from "./category/category.module";
import groupModule from "./group/group.module";
import productModule from "./product/product.module";
import loginModule from "./login/login.module";
const rootModule = {
    category: categoryModule,
    group: groupModule,
    product: productModule,
    login: loginModule
};

export default rootModule;