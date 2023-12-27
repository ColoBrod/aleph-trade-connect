import React from 'react';

import "./style.css";
import Button from '~/components/ui/Button';

const DeleteAccount = () => {
  return (
    <div className="page-profile__tab page-profile__tab-delete-account">
      <h1>Удалить аккаунт</h1>

      <section className="section-buttons">
        <Button onClick={e => 1}>Удалить</Button>
        <Button onClick={e => 1}>Отменить</Button>
      </section>
    </div>  
  )
}

export default DeleteAccount;