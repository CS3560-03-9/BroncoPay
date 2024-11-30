import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

export default function CardSection({ title, content, listItems }) {
    return (
    <Card
        sx={{
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: 2,
            padding: 2, 
            width: 300, 
        }}
    >
    <CardContent>
        {/* Title with larger font size */}
        <Typography 
              variant="h5" 
            component="h2" 
            sx={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 1 }}
        >
        {title}

        </Typography>
        {/* Content with medium size font */}
        {content && (
            <Typography
                variant="body1"
                component="p"
                sx={{
                    fontSize: "1rem",
                    marginBottom: 1.5,
                    color: "text.secondary",
                }}
            >
            {content}
            </Typography>
        )}

        {/* List items */}
        {listItems && (
            <List sx={{ paddingLeft: 0 }}>
            {listItems.map((item, index) => (
                <ListItem
                    key={index}
                    sx={{
                        fontSize: "0.875rem", 
                        padding: 0, 
                        marginBottom: 0.5, 
                    }}
                >
                {item}
                </ListItem>
            ))}
            </List>
        )}
    </CardContent>
    </Card>
    );
}
