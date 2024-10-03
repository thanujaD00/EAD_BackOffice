interface Vendor {
    id: string | null;
    FirstName: string;
    LastName: string;
    Email: string;
    Age: number;
    Password: string | null;
    Role: string;
    Status: string | null;
}

interface Product {
    Id: string;
    VendorId: string | null;
    Name: string;
    Description: string;
    ImageUrl: string;
    Price: number;
    Qty: number;
    CategoryId: string | null;
    IsActive: boolean;
    CreatedAt: string;
    UpdatedAt: string;
    Category: null; // Assuming Category structure is not defined
    Vendor: null; // Assuming Vendor structure is not defined
}

interface OrderItem {
    Id: string;
    OrderId: string;
    ProductId: string;
    Quantity: number;
    Price: number;
    VendorId: string;
    Status: string;
    Product: Product;
    Vendor: Vendor;
}

interface Customer {
    id: string | null;
    FirstName: string;
    LastName: string;
    Email: string;
    Age: number;
    Password: string | null;
    Role: string;
    Status: string | null;
}

interface Order {
    Id: string;
    CustomerId: string;
    OrderStatus: string;
    TotalAmount: number;
    CreatedAt: string;
    UpdatedAt: string;
    OrderItems: OrderItem[];
    Customer: Customer;
}

export const OrdersData: Order[] = [
    {
        Id: "66fead20211e61cd783ff92c",
        CustomerId: "66facabaca4fac25831ceb1e",
        OrderStatus: "Cancelled",
        TotalAmount: 6500.0,
        CreatedAt: "2024-10-03T14:41:35.862Z",
        UpdatedAt: "2024-10-03T14:41:35.862Z",
        OrderItems: [
            {
                Id: "66fead1f211e61cd783ff92a",
                OrderId: "66fead20211e61cd783ff92c",
                ProductId: "66fd84c31105e889ced9f18e",
                Quantity: 2,
                Price: 2000.0,
                VendorId: "66fd83481105e889ced9f18c",
                Status: "Ready",
                Product: {
                    Id: "66fd84c31105e889ced9f18e",
                    VendorId: null,
                    Name: "Make up brush",
                    Description: "13 PCS Makeup Brushes Set Eye Shadow Foundation Women Cosmetic Brush",
                    ImageUrl: "https://res.cloudinary.com/dkn3pdpp2/image/upload/v1727890626/j1dzd3qa7dedh8whjm11.jpg",
                    Price: 2000.0,
                    Qty: 18,
                    CategoryId: null,
                    IsActive: false,
                    CreatedAt: "0001-01-01T00:00:00",
                    UpdatedAt: "0001-01-01T00:00:00",
                    Category: null,
                    Vendor: null,
                },
                Vendor: {
                    id: null,
                    FirstName: "ThanujaVendor",
                    LastName: "Vendor",
                    Email: "thanujavendor@gmail.com",
                    Age: 24,
                    Password: null,
                    Role: "vendor",
                    Status: null,
                },
            },
            {
                Id: "66fead20211e61cd783ff92b",
                OrderId: "66fead20211e61cd783ff92c",
                ProductId: "66fd85221105e889ced9f18f",
                Quantity: 1,
                Price: 2500.0,
                VendorId: "66fd83481105e889ced9f18c",
                Status: "Processing",
                Product: {
                    Id: "66fd85221105e889ced9f18f",
                    VendorId: null,
                    Name: "Kettle",
                    Description: "TKS 2.5L Whistling Kettle Red Color - Stainless Steel Material.",
                    ImageUrl: "https://res.cloudinary.com/dkn3pdpp2/image/upload/v1727890721/atn6ql881dfxtoazildo.jpg",
                    Price: 2500.0,
                    Qty: 199,
                    CategoryId: null,
                    IsActive: false,
                    CreatedAt: "0001-01-01T00:00:00",
                    UpdatedAt: "0001-01-01T00:00:00",
                    Category: null,
                    Vendor: null,
                },
                Vendor: {
                    id: null,
                    FirstName: "ThanujaVendor",
                    LastName: "Vendor",
                    Email: "thanujavendor@gmail.com",
                    Age: 24,
                    Password: null,
                    Role: "vendor",
                    Status: null,
                },
            },
        ],
        Customer: {
            id: null,
            FirstName: "Thanuja",
            LastName: "Admin",
            Email: "thanujauser@gmail.com",
            Age: 25,
            Password: null,
            Role: "admin",
            Status: null,
        },
    },
    {
        Id: "66fec0b9211e61cd783ff930",
        CustomerId: "66faa9f5140d360c74e6d865",
        OrderStatus: "Processing",
        TotalAmount: 16500.0,
        CreatedAt: "2024-10-03T16:05:12.778Z",
        UpdatedAt: "2024-10-03T16:05:12.778Z",
        OrderItems: [
            {
                Id: "66fec0b8211e61cd783ff92d",
                OrderId: "66fec0b9211e61cd783ff930",
                ProductId: "66fd84c31105e889ced9f18e",
                Quantity: 5,
                Price: 2000.0,
                VendorId: "66fd83481105e889ced9f18c",
                Status: "Processing",
                Product: {
                    Id: "66fd84c31105e889ced9f18e",
                    VendorId: null,
                    Name: "Make up brush",
                    Description: "13 PCS Makeup Brushes Set Eye Shadow Foundation Women Cosmetic Brush",
                    ImageUrl: "https://res.cloudinary.com/dkn3pdpp2/image/upload/v1727890626/j1dzd3qa7dedh8whjm11.jpg",
                    Price: 2000.0,
                    Qty: 13,
                    CategoryId: null,
                    IsActive: false,
                    CreatedAt: "0001-01-01T00:00:00",
                    UpdatedAt: "0001-01-01T00:00:00",
                    Category: null,
                    Vendor: null
                },
                Vendor: {
                    id: null,
                    FirstName: "ThanujaVendor",
                    LastName: "Vendor",
                    Email: "thanujavendor@gmail.com",
                    Age: 24,
                    Password: null,
                    Role: "vendor",
                    Status: null
                }
            },
            {
                Id: "66fec0b9211e61cd783ff92e",
                OrderId: "66fec0b9211e61cd783ff930",
                ProductId: "66fd85221105e889ced9f18f",
                Quantity: 1,
                Price: 2500.0,
                VendorId: "66fd83481105e889ced9f18c",
                Status: "Processing",
                Product: {
                    Id: "66fd85221105e889ced9f18f",
                    VendorId: null,
                    Name: "Kettle",
                    Description: "TKS 2.5L Whistling Kettle Red Color - Stainless Steel Material.",
                    ImageUrl: "https://res.cloudinary.com/dkn3pdpp2/image/upload/v1727890721/atn6ql881dfxtoazildo.jpg",
                    Price: 2500.0,
                    Qty: 198,
                    CategoryId: null,
                    IsActive: false,
                    CreatedAt: "0001-01-01T00:00:00",
                    UpdatedAt: "0001-01-01T00:00:00",
                    Category: null,
                    Vendor: null
                },
                Vendor: {
                    id: null,
                    FirstName: "ThanujaVendor",
                    LastName: "Vendor",
                    Email: "thanujavendor@gmail.com",
                    Age: 24,
                    Password: null,
                    Role: "vendor",
                    Status: null
                }
            },
            {
                Id: "66fec0b9211e61cd783ff92f",
                OrderId: "66fec0b9211e61cd783ff930",
                ProductId: "66fd85bf1105e889ced9f190",
                Quantity: 4,
                Price: 1000.0,
                VendorId: "66fd837e1105e889ced9f18d",
                Status: "Processing",
                Product: {
                    Id: "66fd85bf1105e889ced9f190",
                    VendorId: null,
                    Name: "Incandescent light bulb",
                    Description: "An incandescent light bulb, incandescent lamp or incandescent light globe is an electric light with a filament that is heated until it glows.",
                    ImageUrl: "https://res.cloudinary.com/dkn3pdpp2/image/upload/v1727890879/zx6nczrmgrgcgi3kfsxj.jpg",
                    Price: 1000.0,
                    Qty: 6,
                    CategoryId: null,
                    IsActive: false,
                    CreatedAt: "0001-01-01T00:00:00",
                    UpdatedAt: "0001-01-01T00:00:00",
                    Category: null,
                    Vendor: null
                },
                Vendor: {
                    id: null,
                    FirstName: "KasunVendor",
                    LastName: "Vendor",
                    Email: "kasunvendor@gmail.com",
                    Age: 34,
                    Password: null,
                    Role: "vendor",
                    Status: null
                }
            }
        ],
        Customer: {
            id: null,
            FirstName: "John",
            LastName: "Doe",
            Email: "sadeepalakshan0804@gmail.com",
            Age: 25,
            Password: null,
            Role: "vendor",
            Status: null
        }
    }
];