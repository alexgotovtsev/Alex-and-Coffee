'use client';

import { useRouter } from 'next/navigation';

export default function Categories() {
  const router = useRouter();

  let queryParams: any;

  function handlerClick(checkbox: any) {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);
    }

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      const inputItem = item as HTMLInputElement;
      if (inputItem !== checkbox) inputItem.checked = false;
    });

    if (checkbox.checked === false) {
      // удаляем фильтер в запросе
      queryParams.delete(checkbox.name);
    } else {
      // устанавливаем фильтер в запросе
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
    }
    const path = window.location.pathname + '?' + queryParams.toString();
    router.push(path);
  }

  function checkHandler(checkBoxType: any, checkBoxValue: any) {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <div className="fixed top-0 left-0 bg-white w-1/6 h-screen p-12">
      <h1 className="text-xl text-center mb-8">Категории товаров</h1>
      <ul className="flex flex-col gap-8 ">
        <li className="">
          <label>
            <input
              name="type"
              type="checkbox"
              value="coffee"
              defaultChecked={checkHandler('type', 'coffee')}
              onClick={(e) => handlerClick(e.target)}
            />
            <span className="ml-4">Кофе</span>
          </label>
        </li>
        <li className="">
          <label>
            <input
              name="type"
              type="checkbox"
              value="tea"
              defaultChecked={checkHandler('type', 'tea')}
              onClick={(e) => handlerClick(e.target)}
            />
            <span className="ml-4">Чай</span>
          </label>
        </li>
        <li className="">
          <label>
            <input
              name="type"
              type="checkbox"
              value="drinks"
              defaultChecked={checkHandler('type', 'drinks')}
              onClick={(e) => handlerClick(e.target)}
            />
            <span className="ml-4">Напитки</span>
          </label>
        </li>
        <li className="">
          <label>
            <input
              name="type"
              type="checkbox"
              value="dessert"
              defaultChecked={checkHandler('type', 'dessert')}
              onClick={(e) => handlerClick(e.target)}
            />
            <span className="ml-4">Десерты</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
