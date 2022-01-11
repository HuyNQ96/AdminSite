import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomConvertService {

  constructor() { }
  // Hàm chuyển từ danh sách sang cây (với ID và PARENT_ID)
  listToTree(branches: any, node: any) {
    // Nếu chưa có cha
    if (!branches[node.PARENT_ID]) {
      branches[node.PARENT_ID] = {};
    }
    branches[node.PARENT_ID][node.ID] = node;
    branches[node.ID] = Object.assign(node, branches[node.ID]);

    return branches;
  }
  // Hàm convert List Object thành List TreeNode => sử dụng cho Dropdown
  // Trong đó
  // id: ID của Object (thường sẽ giữ nguyên là ID)
  // parent_id: ID cha (trong trường hợp các bảng của LOS là PARENT_ID)
  // code: Code của Object 
  // name: Name của Object
  public generateTreeStructure(parentNode: any, lstObject: any[], id: string = "ID", parent_id: string = "PARENT_ID", code: string = "PRODUCT_CODE", name: string = "PRODUCT_NAME"): TreeNode {
    let parentNodeChildren: TreeNode[] = [];
    console.log("code: ", code);
    console.log("name: ", name);
    console.log("parentNode[code]: ", parentNode[code]);
    console.log("parentNode[name]: ", parentNode[name]);
    let item: TreeNode = {
      label: parentNode[code] + ': ' + parentNode[name],
      data: parentNode[id],
      expandedIcon: "fa fa-folder-open",
      expanded: true,
      collapsedIcon: "pi pi-minus",
      children: []
    };
    lstObject.forEach(item => {
      if (parentNode[id] === item[parent_id]) {
        let childNode: TreeNode = {
          label: item[code] + ': ' + item[name],
          data: item[id],
          expandedIcon: "fa fa-folder-open",
          expanded: true,
          collapsedIcon: "pi pi-minus",
          children: []
        };
        childNode = this.generateTreeStructure(item, lstObject, id, parent_id, code, name);
        parentNodeChildren.push(childNode);
      }
    });
    if (item.children)
      item.children.push(...parentNodeChildren);
    return item;
  }
}
