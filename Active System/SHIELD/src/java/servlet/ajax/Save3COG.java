/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import entity.COG;
import entity.EEntity;
import entity.Excerpt;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Dan Torres
 */
public class Save3COG extends HttpServlet {

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
            out.println("<title>Servlet Save3COG</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Save3COG at " + request.getContextPath() + "</h1>");
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
        HttpSession session = request.getSession();
        int editorID = (int)session.getAttribute("userID");
        int missionID = (int)session.getAttribute("missionID");
        
        String nodeJSON = request.getParameter("nodeJSON");
        String edgeJSON = request.getParameter("edgeJSON");
        //JSONArray ccArr = new JSONArray(request.getParameter("ccArr"));
        JSONArray crArr = new JSONArray(request.getParameter("crArr"));
        
        //System.out.println("CC Array: " + ccArr.toString());
        System.out.println("CR Array: " + crArr.toString());
        ArrayList<EEntity> crList = new ArrayList<EEntity>();
        for(Object j : crArr){
            JSONObject jsob = new JSONObject(j.toString());
            EEntity eent = new EEntity();
            eent.setName(jsob.getString("name"));
            eent.setClassID(jsob.getInt("class"));
            
            crList.add(eent);
        }
        
        COG cog = new COG();
        cog.setNodeJSON(nodeJSON);
        cog.setEdgeJSON(edgeJSON);
        
        
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("<strong>Center of Gravity Analysis</strong> has been <strong>saved.</strong>");
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
