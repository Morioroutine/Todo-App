"use client";

import { remove } from "@/actions/todo";

const Delete = ({ id, onDeleteSuccess }) => {
    const onDelete = async () => {
      if (window.confirm("本当に削除しますか？")) {
        await delete(id); // 削除処理を非同期で待つ
        alert("削除しました");
        onDeleteSuccess(); // 削除後の処理を実行
      }
    };
  
    return (
      <>
        <button type="button" onClick={onDelete}>削除</button>
      </>
    );
  };
  

  export default Delete;

  