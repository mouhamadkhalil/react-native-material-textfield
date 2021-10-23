
export function formatChangeTypes(cancellationDropdown) {
    var types = cancellationDropdown.map(function (type) {
        return {
            label: type.ID,
            value: type.Value,
        };
    });
    return types;
}

