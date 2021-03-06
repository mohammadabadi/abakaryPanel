import categoryModule from "./category/category.module";
import shopModule from "./shop/shop.module"
import groupModule from "./group/group.module";
import createGroupModule from "./group/create/group.module";
import deleteGroupModule from "./group/delete/group.module";
import editGroupModule from "./group/edit/group.module";
import productModule from "./product/product.module";
import loginModule from "./login/login.module";
import editProfileModule from "./profile/edit/profile.module";
const rootModule = {
    category: categoryModule,
    group: groupModule,
    product: productModule,
    login: loginModule,
    createGroup: createGroupModule,
    deleteGroup: deleteGroupModule,
    editGroup: editGroupModule,
    shop: shopModule,
    editProfile: editProfileModule,
};

export default rootModule;