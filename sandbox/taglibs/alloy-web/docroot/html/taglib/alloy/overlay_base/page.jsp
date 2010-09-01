<%@ include file="init.jsp" %>

<c:if test="<%= useJavaScript %>">
	<alloy:component
		excludeAttributes="var,javaScriptAttributes,useMarkup"
		tagPageContext="<%= pageContext %>"
		options="<%= options %>"
		var="OverlayBase1"
		module="aui-overlay"
		name="OverlayBase"
		yuiVariable="A"
	/>
</c:if>