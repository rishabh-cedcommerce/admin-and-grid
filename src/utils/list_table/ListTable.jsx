import React from 'react';
import { Page, Card, DataTable } from "@shopify/polaris";

function ListTable({data,headings=["No Heading"],actualData}) {

    // console.log(actualData[0]);
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
                    headings={headings}
                    // rows={data}
                    rows={actualData}
                />
            </Card>
        </Page>
    );
}

export default ListTable;