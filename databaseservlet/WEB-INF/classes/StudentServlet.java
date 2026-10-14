import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/register")
public class StudentServlet extends HttpServlet {

    private Connection getConnection()
            throws Exception {

        Class.forName("com.mysql.cj.jdbc.Driver");

        return DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/studentdb",
            "root",
            "YOUR_MYSQL_PASSWORD"
        );
    }

    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String department =
            request.getParameter("department");

        String sql =
            "INSERT INTO students (name, department) VALUES (?, ?)";

        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setString(2, department);

            ps.executeUpdate();

            out.println("<h2>Student registered successfully!</h2>");
            out.println("<a href='index.html'>Go Back</a>");
            out.println("<br><a href='register'>View Students</a>");

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<h2>Registration failed. Check server logs.</h2>");
        }
    }

    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body>");
        out.println("<h2>Student List</h2>");
        out.println("<table border='1' cellpadding='8'>");
        out.println("<tr><th>ID</th><th>Name</th><th>Department</th></tr>");

        String sql = "SELECT * FROM students";

        try (Connection con = getConnection();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                out.println("<tr>");
                out.println("<td>" + rs.getInt("id") + "</td>");
                out.println("<td>" + rs.getString("name") + "</td>");
                out.println("<td>" + rs.getString("department") + "</td>");
                out.println("</tr>");
            }

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<tr><td colspan='3'>Unable to load students</td></tr>");
        }

        out.println("</table>");
        out.println("<br><a href='index.html'>Back to Form</a>");
        out.println("</body></html>");
    }
}