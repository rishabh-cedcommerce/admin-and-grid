import React from 'react';
import { Page, Card, DataTable, Button } from "@shopify/polaris";

function Products() {

const handleLogIn=()=>console.log("LogIn")
const handleViewUser=()=>console.log("View User")


    const rows = [
        ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00",<Button primary onClick={handleLogIn} >LogIn</Button>,<Button primary onClick={handleViewUser}>View User</Button>],
        // ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
        // ["Navy Merino Wool Blazer ","$445.00",124518,32,"$14,240.00",],
      ];
    
    return ( 
        
        <Page>
            <Card>
                <DataTable
                    showTotalsInFooter
                    columnContentTypes={[
                        "text",
                        "numeric",
                        "numeric",
                        "numeric",
                        "numeric",
                    ]}
                    headings={[
                        "Product",
                        "Price",
                        "SKU Number",
                        "Net quantity",
                        "Net sales",
                        "LogIn as User",
                        "View User"
                      ]}
                    rows={rows}
                />
            </Card>
        </Page>
     );
}

export default Products;