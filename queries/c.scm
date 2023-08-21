[
    (function_definition
        type: (_) @return_type
        declarator: (function_declarator
            declarator: (identifier) @function_name
            parameters: (parameter_list
                (
                    (parameter_declaration
                        type: _ @parameter_type
                    )
                    ","?
                )*
            )
        )
    ) @function_body
    (declaration
        type: (_) @return_type
        declarator: (function_declarator
            declarator: (identifier) @function_name
            parameters: (parameter_list
                (
                    (parameter_declaration
                        type: _ @parameter_type
                    )
                    ","?
                )*
            )
        )
    ) @function_body
]