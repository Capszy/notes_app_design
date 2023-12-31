import React, { useState, useEffect } from 'react';
import './App.css';

// const Slider = ({ isOpen, onClose, onSave, content }) => {
//   const [editedContent, setEditedContent] = useState(content);
//   return (
//     <div className={`slider ${isOpen ? 'open' : ''}`}>
//       <textarea
//         value={editedContent}
//         onChange={(e) => setEditedContent(e.target.value)}
//       />
//       <button onClick={onSave}>Save</button>
//       <button onClick={onClose}>Close</button>
//     </div>
//   );
// };

const App = () => {
  const [menus, setMenus] = useState([
    { id: 1, name: 'Menu 1', items: ['Item 1'] },
  ]);

  const [itemPanels, setItemPanels] = useState({});

  const maxMenus = 2; // Example: Set a maximum number of menus
  const maxItemsPerMenu = 3; // Example: Set a maximum number of items per menu

  // const [sliderState, setSliderState] = useState({
  //   isOpen: false,
  //   menuId: null,
  //   itemIndex: null,
  // });
  // const toggleSlider = (menuId, itemIndex) => {
  //   setSliderState({
  //     isOpen: !sliderState.isOpen,
  //     menuId,
  //     itemIndex,
  //   });
  // };
  // const saveSliderContent = (editedContent) => {
  //   const updatedMenus = menus.map((menu) =>
  //     menu.id === sliderState.menuId
  //       ? {
  //           ...menu,
  //           items: menu.items.map((item, index) =>
  //             index === sliderState.itemIndex ? editedContent : item
  //           ),
  //         }
  //       : menu
  //   );
  //   setMenus(updatedMenus);
  //   toggleSlider(null, null);
  // };

  const handleAddMenu = () => {
    if (menus.length < maxMenus) {
      const newMenu = {
        id: menus.length + 1,
        name: `Menu ${menus.length + 1}`,
        items: ['New Item 1'],
      };

      setMenus([...menus, newMenu]);
    } else {
      alert('Cannot add more menus. Maximum limit reached.');
    }
  };  

  const handleDeleteMenu = (id) => {
    const updatedMenus = menus.filter((menu) => menu.id !== id);
    setMenus(updatedMenus);
  };
  
  const handleMenuNameChange = (id, newName) => {
    const updatedMenus = menus.map((menu) =>
      menu.id === id ? { ...menu, name: newName } : menu
    );
    setMenus(updatedMenus);
  };

  const handleAddItem = (menuId) => {
    const menu = menus.find((menu) => menu.id === menuId);
    if (menu && menu.items.length < maxItemsPerMenu) {
      const updatedMenus = menus.map((menu) =>
        menu.id === menuId
          ? { ...menu, items: [...menu.items, `New Item ${menu.items.length + 1}`] }
          : menu
      );
      setMenus(updatedMenus);
    } else {
      alert('Cannot add more items to this menu. Maximum limit reached.');
    }
  };

  const handleDeleteItem = (menuId, itemIndex) => {
    const updatedMenus = menus.map((menu) =>
      menu.id === menuId
        ? { ...menu, items: menu.items.filter((_, index) => index !== itemIndex) }
        : menu
    );
    setMenus(updatedMenus);
  };

  useEffect(() => {
    // Check available screen space or any other condition
    if (menus.length * 320 > window.innerHeight) {
      alert('Exceeded screen space for menus. Remove some menus to add more.');
    }
  }, [menus]);

  const toggleItemPanel = (menuId, itemIndex) => {
    const panelKey = `${menuId}-${itemIndex}`;
    setItemPanels((prevPanels) => ({
      ...prevPanels,
      [panelKey]: !prevPanels[panelKey],
    }));
  };
  
  return (
    <div className="app-container">
      <div className="side-menu">
        {menus.map(menu => (
          <div key={menu.id} className="menu">
            <input
              type="text"
              value={menu.name}
              onChange={(e) => handleMenuNameChange(menu.id, e.target.value)}
              className="menu-title-input"
            />
            <ul>
              {menu.items.map((item, index) => (
                <li key={index}>
                  <div className="item-container">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItem = e.target.value;
                      handleMenuNameChange(menu.id, menu.name);
                      const updatedMenus = menus.map((m) =>
                        m.id === menu.id ? { ...m, items: m.items.map((itm, idx) => (idx === index ? newItem : itm)) } : m
                      );
                      setMenus(updatedMenus);
                    }}
                    className="item-title-input"
                  />
                  <button
                    className="delete-item-button"
                    onClick={() => handleDeleteItem(menu.id, index)}
                  >
                    Delete Item
                  </button>
                  </div>
                </li>
                
              ))}
              <button className="add-item-button" onClick={() => handleAddItem(menu.id)}>
              Add Item
              </button>
            </ul>

            <button
              className="delete-menu-button"
              onClick={() => handleDeleteMenu(menu.id)}
            >
              Delete Menu
            </button>
          </div>
        ))}
        <button className="add-menu-button" onClick={handleAddMenu}>
          Add Menu
        </button>
      </div>
    </div>
  );
};

export default App;
