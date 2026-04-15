import { db } from "../db/connection.js";

export const createApartment = async (data, images) => {
  const {
    title_fr,
    title_en,
    address,
    unit,
    postalCode,
    price,
    bedrooms,
    bathrooms,
    sqft,
    neighborhood,
    description_fr,
    description_en,
    tags,
    customTags,
    visible,
    availability_fr,
    availability_en,
  } = data;

  const [result] = await db.execute(
    `INSERT INTO apartments
      (title, title_fr, title_en, address, unit, postal_code, price, bedrooms, bathrooms, sqft, neighborhood,
       description, description_fr, description_en, tags, custom_tags, images, visible,
       availability, availability_fr, availability_en)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title_fr || null,
      title_fr || null,
      title_en || null,
      address,
      unit,
      postalCode,
      price,
      bedrooms,
      bathrooms,
      sqft,
      neighborhood,
      description_fr || null,
      description_fr || null,
      description_en || null,
      JSON.stringify(tags || []),
      JSON.stringify(customTags || []),
      JSON.stringify(images || []),
      visible,
      availability_fr || null,
      availability_fr || null,
      availability_en || null,
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
    title_fr,
    title_en,
    address,
    unit,
    postalCode,
    price,
    bedrooms,
    bathrooms,
    sqft,
    neighborhood,
    description_fr,
    description_en,
    tags,
    customTags,
    images,
    visible,
    availability_fr,
    availability_en,
  } = data;

  await db.execute(
    `UPDATE apartments
     SET title=?, title_fr=?, title_en=?,
         address=?, unit=?, postal_code=?, price=?, bedrooms=?, bathrooms=?, sqft=?, neighborhood=?,
         description=?, description_fr=?, description_en=?,
         tags=?, custom_tags=?, images=?, visible=?,
         availability=?, availability_fr=?, availability_en=?
     WHERE id=?`,
    [
      safeValue(title_fr),
      safeValue(title_fr),
      safeValue(title_en),
      safeValue(address),
      safeValue(unit),
      safeValue(postalCode),
      safeValue(price),
      safeValue(bedrooms),
      safeValue(bathrooms),
      safeValue(sqft),
      safeValue(neighborhood),
      safeValue(description_fr),
      safeValue(description_fr),
      safeValue(description_en),
      JSON.stringify(tags || []),
      JSON.stringify(customTags || []),
      JSON.stringify(images || []),
      safeValue(visible),
      safeValue(availability_fr),
      safeValue(availability_fr),
      safeValue(availability_en),
      id,
    ]
  );
};

export const deleteApartmentById = async (id) => {
  await db.execute("DELETE FROM apartments WHERE id=?", [id]);
};