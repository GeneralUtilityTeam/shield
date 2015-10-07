/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import java.io.IOException;
import java.io.PrintWriter;
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
public class GetExcerptOfMission extends HttpServlet {

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
            out.println("<title>Servlet GetExcerptOfMission</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet GetExcerptOfMission at " + request.getContextPath() + "</h1>");
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
        //Dummy Data
        JSONArray excrArray = new JSONArray();
        
        //Dummy data
//        JSONObject excr1 = new JSONObject();
//        excr1.put("id", "1");
//        excr1.put("text", "There are 10,000 people in Maguindanao");
//        excr1.put("category", "social");
//        excr1.put("source", "Maguindanao Area Study");
//        excr1.put("tags", "Maguindanao, Population");
//        excrArray.put(excr1);
//        
//        JSONObject excr2 = new JSONObject();
//        excr2.put("id", "2");
//        excr2.put("text", "There are 10,000 people in Maguindanao");
//        excr2.put("category", "military/security");
//        excr2.put("source", "Maguindanao Area Study");
//        excr2.put("tags", "Maguindanao, Population");
//        excrArray.put(excr2);
        String excrJSON = excrArray.toString();
        
        
        
        //Code from SHIELD 1.1
        //ExcerptDAO excrDAO = new ExcerptDAO();
        //String excrJSON = new JSONArray(excrDAO.getAllExcerptOfMission(Integer.parseInt(request.getParameter("missionID")))).toString();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(excrJSON);
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
