/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import entity.Mission;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

/**
 *
 * @author Dan Torres
 */
public class BeginNewMission extends HttpServlet {

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
            out.println("<title>Servlet BeginNewMission</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet BeginNewMission at " + request.getContextPath() + "</h1>");
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
        
        String title = (String)request.getParameter("missionTitle");
        String objective = (String)request.getParameter("missionObjective");
        String locality = (String)request.getParameter("locality");
        String admin2 = (String)request.getParameter("administrative_area_level_2");
        String admin1 = (String)request.getParameter("administrative_area_level_1");
        String country = (String)request.getParameter("country");
        
        HttpSession session = request.getSession();
        
        Mission mson = new Mission();
        mson.setTitle(title);
        mson.setObjective(objective);
        mson.setLocality(locality);
        mson.setAdministrativeAreaLevel2(admin2);
        mson.setAdministrativeAreaLevel1(admin1);
        mson.setCountry(country);
        mson.setUserID((int)session.getAttribute("userID"));
        
        System.out.println(mson.getLocality()+mson.getAdministrativeAreaLevel2()+mson.getAdministrativeAreaLevel1()+mson.getCountry());
        
        //Save Mission to database

        response.setContentType("plain/text");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(1);
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
