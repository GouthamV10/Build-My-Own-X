function hyperscript(nodeName, attributes, ...args) {
	let children = args.length ? [].concat(...args) : null;
	return { nodeName, attributes, children };
}

console.log(hyperscript("name", "name", ["hi", "bye"]));

function render(vnode) {
	if (typeof vnode === "string") {
		return document.createTextNode(vnode);
	}

	let n = document.createElement(vnode.nodeName);

	let a = vnode.attributes || {};
	Object.keys(a).forEach((k) => n.setAttribute(k, a[k]));

	(vnode.children || []).forEach((c) => n.appendChild(render(c)));

	return n;
}

const people = hyperscript(
	"div",
	{ id: "foo" },
	hyperscript("p", null, "Look, a simple JSX DOM renderer!"),
	hyperscript(
		"ul",
		null,
		hyperscript("li", null, "hello"),
		hyperscript("li", null, "there"),
		hyperscript("li", null, "people")
	)
);

document.addEventListener("DOMContentLoaded", () => {
	document.body.appendChild(render(people));
});
