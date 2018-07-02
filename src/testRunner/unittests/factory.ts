namespace ts {
    describe("FactoryAPI", () => {
        describe("createExportAssignment", () => {
            it("parenthesizes default export if necessary", () => {
                function checkExpression(expression: Expression) {
                    const node = createExportAssignment(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*isExportEquals*/ false,
                        expression,
                    );
                    assert.strictEqual(node.expression.kind, SyntaxKind.ParenthesizedExpression);
                }

                const clazz = createClassExpression(/*modifiers*/ undefined, "C", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                    ts.createProperty(/*decorators*/ undefined, [ts.createToken(ts.SyntaxKind.StaticKeyword)], "prop", /*questionOrExclamationToken*/ undefined, /*type*/ undefined, ts.createLiteral("1")),
                ]);
                checkExpression(clazz);
                checkExpression(createPropertyAccess(clazz, "prop"));

                const func = createFunctionExpression(/*modifiers*/ undefined, /*asteriskToken*/ undefined, "fn", /*typeParameters*/ undefined, /*parameters*/ undefined, /*type*/ undefined, ts.createBlock([]));
                checkExpression(func);
                checkExpression(createCall(func, /*typeArguments*/ undefined, /*argumentsArray*/ undefined));

                checkExpression(createBinary(createLiteral("a"), SyntaxKind.CommaToken, createLiteral("b")));
                checkExpression(createCommaList([createLiteral("a"), createLiteral("b")]));
            });
        });
    });
}
