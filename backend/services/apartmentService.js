import { db } from "../db/connection.js";

export const createApartment = async (data, images) => {
  const {
    title,
    address,
    unit,
    postalCode,
    price,
    bedrooms,
    bathrooms,
    sqft,
    neighborhood,
    description,
    tags,
    visible,
    availability
  } = data;

  const [result] = await db.execute(
    `INSERT INTO apartments 
      (title, address, unit, postal_code, price, bedrooms, bathrooms, sqft, neighborhood, description, tags, images, visible, availability)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      address,
      unit,
      postalCode,
      price,
      bedrooms,
      bathrooms,
      sqft,
      neighborhood,
      description,
      JSON.stringify(tags || []),
      JSON.stringify(images || []),
      visible,
      availability,
    ]
  );

  return result.insertId;
};

export const getAllApartments = async () => {
  const [rows] = await db.execute("SELECT * FROM apartments ORDER BY id DESC");
  return rows;
};

export const getApartmentById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM apartments WHERE id=?", [id]);
  return rows[0] || null;
};

export const updateApartmentById = async (id, data) => {

  const safeValue = (value) => value === undefined ? null : value;

  const {
    title,
    address,
    unit,
    postalCode,
    price,
    bedrooms,
    bathrooms,
    sqft,
    neighborhood,
    description,
    tags,
    images,
    visible,
    availability
  } = data;

  await db.execute(
    `UPDATE apartments 
     SET title=?, address=?, unit=?, postal_code=?, price=?, bedrooms=?, bathrooms=?, sqft=?, neighborhood=?, description=?, tags=?, images=?, visible=?, availability=?
     WHERE id=?`,
    [
      safeValue(title),
      safeValue(address),
      safeValue(unit),
      safeValue(postalCode),
      safeValue(price),
      safeValue(bedrooms),
      safeValue(bathrooms),
      safeValue(sqft),
      safeValue(neighborhood),
      safeValue(description),
      JSON.stringify(tags || []),
      JSON.stringify(images || []),
      safeValue(visible),
      safeValue(availability),
      id
    ]
  );
};

export const deleteApartmentById = async (id) => {
  await db.execute("DELETE FROM apartments WHERE id=?", [id]);
};