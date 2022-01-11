import { Injectable } from '@angular/core';

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
}
