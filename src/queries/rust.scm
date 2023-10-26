(function_item
    name: (identifier) @function_name
    parameters: (parameters
        (
            (parameter
                type: (_) @parameter_type
            )
            ","?
        )*
    )
    return_type: (_) @return_type
) @function_body