/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.IntelligenceDAO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Cyril Torres
 */
public class PrimaryExcerptSearch extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet PrimaryExcerptSearch</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet PrimaryExcerptSearch at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
            //Working Code
//        String query = request.getParameter("param");
//        IntelligenceDAO intlDAO = new IntelligenceDAO();
//        ArrayList excrList = intlDAO.PrimarySearch(query);
//        JSONArray excrJArr = new JSONArray(excrList);
//        String excrJSON = excrJArr.toString();
        
        //Dummy Data
        JSONArray excrArray = new JSONArray();
        JSONArray tagsArray = new JSONArray();

        JSONObject excr1 = new JSONObject();
        excr1.put("id", "1");
        excr1.put("text", "There are 10,000 people in Maguindanao");
        excr1.put("category", "social");
        excr1.put("sourceName", "Maguindanao Area Study");
        tagsArray.put("Maguindanao");
        tagsArray.put("Population");
        excr1.put("tags", tagsArray);
        excr1.put("strength", 78);
        excr1.put("sublocality", "Malate");
        excr1.put("locality", "Manila");
        excr1.put("administrativeAreaLevel2", "");
        excr1.put("administrativeAreaLevel1", "");
        excr1.put("country", "Philippines");
        excr1.put("lat", 7.190708);
        excr1.put("lng", 125.455341);
        excrArray.put(excr1);
        String infrJSON = excrArray.toString();

        //Code from SHIELD 1.1
        //ExcerptDAO excrDAO = new ExcerptDAO();
        //String infrJSON = new JSONArray(excrDAO.primarySearch(request.getParameter("param"))).toString();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(infrJSON);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
