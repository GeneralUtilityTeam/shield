/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.MissionDAO;
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
public class GetAllMissions extends HttpServlet {

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
            out.println("<title>Servlet GetAllMissions</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet GetAllMissions at " + request.getContextPath() + "</h1>");
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
        
        
        //Dummy data
//        JSONObject op1 = new JSONObject();
//        op1.put("id", "1");
//        op1.put("title", "OPERATION PAGKAMULAT");
//        op1.put("objective", "To increase voter population");
//        op1.put("area", "Pampanga");
//        op1.put("status", "5");
//        msonArray.put(op1);
//        
//        JSONObject op2 = new JSONObject();
//        op2.put("id", "2");
//        op2.put("title", "OPERATION TIKAS");
//        op2.put("objective", "To increase voter population");
//        op2.put("area", "Dumaguete");
//        op2.put("status", "4");
//        msonArray.put(op2);
//        
//        JSONObject op3 = new JSONObject();
//        op3.put("id", "3");
//        op3.put("title", "OPERATION TIKAS");
//        op3.put("objective", "To increase voter population");
//        op3.put("area", "Dumaguete");
//        op3.put("status", "7");
//        msonArray.put(op3);
//        msonArray.put(op3);
//        msonArray.put(op3);
//        msonArray.put(op3);
//        msonArray.put(op3);
//        msonArray.put(op3);
//        msonArray.put(op3);
//        msonArray.put(op3);
        MissionDAO msonDAO = new MissionDAO();
        ArrayList msonList = msonDAO.GetAllMissions();
        JSONArray msonJArr= new JSONArray(msonList);
        String msonJSON = msonJArr.toString();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(msonJSON);
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
