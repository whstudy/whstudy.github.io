<html>
<body>
<h2>FreeMarker Demo</h2>

 
<table class="datatable">
    <tr>
        <th>Firstname</th>  <th>Lastname</th>
    </tr>
    <#list model["userList"] as user>
    <tr>
        <td>${user.getUserName()}</td> <td>${user.getPassWord()}</td>
    </tr>
    </#list>
  </table>
</body>
</html>
