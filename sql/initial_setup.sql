insert into login (lusername, lpassword, ldescription, lpermissions) values ('admin','admin','Admin User','1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30');

INSERT INTO menu_groups VALUES (1, 'Warehouse', true, 'warehouse.svg', 3, 'panel-success', 1); 
INSERT INTO menu_groups VALUES (2, 'Workshop', true, 'maintenance.svg', 2, 'panel-success', 1); 
INSERT INTO menu_groups VALUES (3, 'System Setup', true, 'settings.svg', 6, 'panel-danger', 1); 
INSERT INTO menu_groups VALUES (4, 'Fuel register', true, 'fuel.svg', 4, 'panel-success', 1); 
INSERT INTO menu_groups VALUES (5, 'HR', true, 'humanresources.svg', 5, 'panel-info', 1); 
INSERT INTO menu_groups VALUES (6, 'Equipment', true, 'equipment.svg', 1, 'panel-success', 1); 
SELECT pg_catalog.setval('menu_groups_mgid_seq', 6, true); 

INSERT INTO menu VALUES (1, 'Import from Excel', true, 23, 'import_from_excel', 'Import multiple items into stock from an excel sheet', 'not set', 1, 1); 
INSERT INTO menu VALUES (2, 'Maintenance Summaries', true, 25, 'maintenance/summaries', 'Show all maintenance for specific equipment', 'msh', 15, 1); 
INSERT INTO menu VALUES (3, 'Maintenance Requests', true, 28, 'maintenance_request', 'Add/Modify Maintenance Requests', 'new_maintenance_request', 15, 1); 
INSERT INTO menu VALUES (4, 'Suppliers', true, 22, 'suppliers', 'List of company suppliers', 'new_supplier', 1, 1); 
INSERT INTO menu VALUES (5, 'Employee Notes', true, 10000, 'employee_notes', 'Add notes on performance of employees', 'new_employee_note', 18, 1); 
INSERT INTO menu VALUES (6, 'Fuel Register', true, 10000, 'fuel_register', 'Add records of fuel consumption of equipment', 'new_fuel_register', 17, 1); 
INSERT INTO menu VALUES (7, 'Users Setup', true, 8, 'system_users_setup', 'Add or update System Users', 'new_system_user', 3, 1); 
INSERT INTO menu VALUES (8, 'Desktop Icons', true, 10, 'desktop_icons_setup', 'Creates the icons on Desktop and you can bind menu items to the group', 'new_desktop_icon', 3, 1); 
INSERT INTO menu VALUES (9, 'Models', true, 4, 'equipment_models', 'Add or modify Equipment Models (Generic)', 'new_equipment_model', 2, 1); 
INSERT INTO menu VALUES (10, 'Warehouse Setup', true, 12, 'warehouse_setup', 'Setup Warehouses', 'new_warehouse', 3, 1); 
INSERT INTO menu VALUES (11, 'Menu Setup', true, 5, 'system_menu_setup', 'Setup Main Menu', 'new_system_menu_config', 3, 1); 
INSERT INTO menu VALUES (12, 'Owned', true, 2, 'equipment_setup', 'Insert and Delete Equipment', 'new_equipment', 2, 1); 
INSERT INTO menu VALUES (13, 'Goods Issued Notes', true, 18, 'goods_issue_notes', 'Issue items from stock, print the document and update the warehouse', 'new_goods_issue_note', 1, 1); 
INSERT INTO menu VALUES (14, 'In Stock Items', true, 20, 'in_stock_items', 'View items in stock', 'new_in_stock_item', 1, 1); 
INSERT INTO menu VALUES (15, 'Warehouse Items', true, 14, 'warehouse_items_setup', 'Add Items and Information (SKU) for use in the warehouses', 'new_warehouse_item', 1, 1); 
INSERT INTO menu VALUES (16, 'Warehouse Units Setup', true, 16, 'warehouse_units_setup', 'Add or modify units (Unit/KG/Litre)', 'new_warehouse_unit', 3, 1); 

SELECT pg_catalog.setval('menu_mid_seq', 6, true);