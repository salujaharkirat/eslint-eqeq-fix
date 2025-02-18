module.exports = {
    meta: {
        type: "suggestion", // Defines the rule type
        docs: {
            description: "Enforce strict equality (===) instead of loose equality (==), except for null/undefined checks.",
            category: "Best Practices",
            recommended: true
        },
        fixable: "code", // Allows auto-fixing
        schema: [] // No options needed
    },
    create(context) {
        return {
            BinaryExpression(node) {
                // Get the source code text of left and right operands
                const sourceCode = context.getSourceCode();
                const leftText = sourceCode.getText(node.left);
                const rightText = sourceCode.getText(node.right);

                // Check if the comparison involves null or undefined
                const isNullCheck =
                    node.right.type === "Literal" && node.right.value === null;

                const isUndefinedCheck =
                    (node.right.type === "Identifier" && node.right.name === "undefined") ||
                    (node.left.type === "Identifier" && node.left.name === "undefined");

                // Skip fixing if the comparison is with null or undefined
                if ((node.operator === "==" || node.operator === "!=") && (isNullCheck || isUndefinedCheck)) {
                    return;
                }

                // Report and fix other cases of loose equality
                if (node.operator === "==" || node.operator === "!=") {
                    context.report({
                        node,
                        message: `Use strict equality instead of '${node.operator}'.`,
                        fix(fixer) {
                            const replacement = node.operator === "==" ? "===" : "!==";
                            return fixer.replaceText(node, `${leftText} ${replacement} ${rightText}`);
                        }
                    });
                }
            }
        };
    }
};
