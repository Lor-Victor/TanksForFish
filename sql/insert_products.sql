-- insert_products.sql

INSERT INTO products (category, model, name, description, price, dimensions, material, color, image_url) VALUES
-- Tanks (cat_id = 1)
('Tanks', 'AquaView 10G', '10 Gallon Glass Aquarium', 'Standard 10-gallon glass tank', 49.99, '20x10x12 inches', 'Glass', 'Clear', NULL),
('Tanks', 'FlexiCurve 20G', '20 Gallon Curved Front Tank', 'Modern curved front aquarium', 99.99, '24x12x16 inches', 'Glass', 'Clear', NULL),
('Tanks', 'NanoCube 5G', '5 Gallon Nano Cube Tank', 'Compact cube-shaped aquarium', 69.99, '12x12x12 inches', 'Acrylic', 'Clear', NULL),
('Tanks', 'ReefMaster 75G', '75 Gallon Reef-Ready Tank', 'Large tank for reef aquariums', 299.99, '48x18x21 inches', 'Glass', 'Clear', NULL),
('Tanks', 'BettaBowl 1G', '1 Gallon Betta Bowl', 'Small bowl for betta fish', 19.99, '6x6x8 inches', 'Plastic', 'Clear', NULL),
('Tanks', 'Jumba10G', '10 Gallon Tank', 'The perfect starter aquarium! This 10-gallon glass tank provides ample space for a small community of fish or a stunning planted tank. The durable construction ensures years of enjoyment. Ideal for beginners and experienced fish keepers alike. This 10-gallon aquarium features tempered glass construction for a more durable tank. It includes a lid to prevent evaporation and to prevent any hazards from falling in. A black trim comes around the edges to any chips or sudden bumps from shattering the tank. This tank is perfect for most starters. Decorations, filter, substrate, and fish not included. What comes included:
10 gallon glass tank, Lid',15.00,'19.7 x 11.4 x 18.9 inches','Glass','Clear','../images/products/tanks/10-gallon.jpg')
-- Filters & Filter Media (cat_id = 2)
('Filters & Filter Media', 'AquaClear 50', 'Hang-On Back Filter', 'Filter for aquariums up to 50 gallons', 39.99, 'Standard', 'Plastic', 'Black', NULL),
('Filters & Filter Media', 'Fluval FX6', 'Canister Filter', 'High-performance canister filter', 249.99, 'Large', 'Plastic', 'Black', NULL),
('Filters & Filter Media', 'Sponge Filter', 'Double Sponge Filter', 'Simple and effective sponge filter', 12.99, 'Small', 'Sponge', 'Black', NULL),
('Filters & Filter Media', 'Activated Carbon', 'Activated Carbon Filter Media', 'Removes impurities and odors', 9.99, 'Various Sizes', 'Carbon', 'Black', NULL),
('Filters & Filter Media', 'Ceramic Rings', 'Ceramic Ring Filter Media', 'Provides biological filtration', 14.99, 'Various Sizes', 'Ceramic', 'White', NULL),

-- Substrates (cat_id = 3)
('Substrates', 'Aquarium Gravel', 'Natural Aquarium Gravel', 'Gravel for freshwater aquariums', 14.99, 'Various Sizes', 'Gravel', 'Natural', NULL),
('Substrates', 'Planted Tank Soil', 'Planted Aquarium Soil', 'Nutrient-rich soil for planted tanks', 19.99, 'Various Sizes', 'Soil', 'Dark Brown', NULL),
('Substrates', 'Aquarium Sand', 'Fine Aquarium Sand', 'Sand for bottom-dwelling fish', 16.99, 'Various Sizes', 'Sand', 'Natural', NULL),
('Substrates', 'Root Tabs', 'Fertilizer Root Tabs', 'Fertilizer for aquatic plants', 11.99, 'Standard', 'Fertilizer', 'N/A', NULL),
('Substrates', 'Decorative Rocks', 'Assorted Decorative Rocks', 'Rocks for aquarium decoration', 24.99, 'Various Sizes', 'Rock', 'Various', NULL),

-- Electricals (cat_id = 4)
('Electricals', 'LED Aquarium Light', 'Full Spectrum LED Light', 'Light for planted and reef aquariums', 59.99, 'Various Sizes', 'Metal/Plastic', 'Black', NULL),
('Electricals', 'Aquarium Heater', 'Adjustable Aquarium Heater', 'Heater for maintaining water temperature', 29.99, 'Various Sizes', 'Glass/Metal', 'Black', NULL),
('Electricals', 'Air Pump', 'Dual Outlet Air Pump', 'Air pump for aeration and filters', 19.99, 'Standard', 'Plastic', 'Black', NULL),
('Electricals', 'Wavemaker', 'Circulation Wavemaker', 'Creates water flow in aquariums', 34.99, 'Various Sizes', 'Plastic', 'Black', NULL),
('Electricals', 'Timer Outlet', 'Programmable Timer Outlet', 'Automates lighting and other equipment', 17.99, 'Standard', 'Plastic', 'White', NULL),

-- Food (cat_id = 5)
('Food', 'Tropical Flakes', 'Tropical Fish Flakes', 'Balanced diet for tropical fish', 7.99, 'Various Sizes', 'N/A', 'N/A', NULL),
('Food', 'Bottom Feeder Tablets', 'Bottom Feeder Tablets', 'Food for bottom-dwelling fish', 9.99, 'Various Sizes', 'N/A', 'N/A', NULL),
('Food', 'Frozen Bloodworms', 'Frozen Bloodworms', 'Treat food for carnivorous fish', 6.99, 'Various Sizes', 'N/A', 'N/A', NULL),
('Food', 'Shrimp Pellets', 'Shrimp Pellets', 'Food for shrimp and invertebrates', 8.99, 'Various Sizes', 'N/A', 'N/A', NULL),
('Food', 'Algae Wafers', 'Algae Wafers', 'Food for algae-eating fish', 5.99, 'Various Sizes', 'N/A', 'N/A', NULL);